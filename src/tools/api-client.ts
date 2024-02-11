import { AXIComponent, Gateway, Interconnect, MemoryBlock, RISCV, Register, SoC } from "../types";
import { ComponentsLibrary } from "./components-library";

export class  APIClient {
    static port: number = 0;
    
    static async checkConnection() {
        const port = APIClient.port;

        try {
            const response = await fetch(`http://localhost:${port}/status`);
            const status = await response.json();
            return status?.status ?? false;
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
              new AXIComponent({Name: Interconnect.type, IsTopLevel: true}),
              new AXIComponent({Name: Gateway.type, IsTopLevel: true}),
              new AXIComponent({Name: RISCV.type, IsMaster: true}),
              new AXIComponent({Name: Register.type, IsSlave: true}),
              new AXIComponent({Name: MemoryBlock.type, IsSlave: true}),
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