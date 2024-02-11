import { AXIComponent, Gateway, Interconnect, MemoryBlock, RISCV, Register, SoC } from "../types";
import { ComponentsLibrary } from "./components-library";

export class  APIClient {
    static async getComponents(port: number) {
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

    static async socUpdate(port: number, soc: SoC) {
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