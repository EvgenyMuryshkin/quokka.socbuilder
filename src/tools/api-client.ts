import { SoCComponentInfo, Gateway, Interconnect, MemoryBlock, RISCV, Register, SoC } from "../types";
import { ComponentsLibrary } from "./components-library";

export class  APIClient {
    static port: number = 0;
    
    static async checkConnection() {
        const port = APIClient.port;

        try {
            const response = await fetch(`http://localhost:${port}/status`);
            const status = await response.json();
            return status?.Status ?? false;
        }
        catch {
            return false;
        }
    }

    static async getComponents() {
        const port = APIClient.port;
        try {
            const response = await fetch(`http://localhost:${port}/components`);
            const components = await response.json();
            return new ComponentsLibrary(components);  
          }
          catch {
            return new ComponentsLibrary([
              new SoCComponentInfo({Name: Interconnect.type, DisplayName: "Interconnect", IsTopLevel: true}),
              new SoCComponentInfo({Name: Gateway.type, DisplayName: "Gateway", IsTopLevel: true}),
              new SoCComponentInfo({Name: RISCV.type, DisplayName: "RISCV", IsMaster: true}),
              new SoCComponentInfo({Name: Register.type, DisplayName: "Register", IsSlave: true}),
              new SoCComponentInfo({Name: MemoryBlock.type, DisplayName: "MemoryBlock", IsSlave: true}),
            ]);
          }
    }

    static async socUpdate(soc: SoC) {
        const port = APIClient.port;

        const json = JSON.stringify(soc);

        const url = `http://localhost:${port}/soc/update`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: json
          });

          return response.json(); // parses JSON response into native JavaScript objects
    }
}