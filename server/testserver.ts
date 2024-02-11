import express, { Express, Request, Response } from "express";
import cors from "cors";

import { AXIComponent, Gateway, Interconnect, MemoryBlock, RISCV, Register } from "../src/types"
import { ComponentsLibrary } from "../src/tools"

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get("/status", (request, response) => {
    const status = {
       "Status": "Running"
    };
    
    response.send(status);
});

app.get("/components", (request, response) => {
    const library = new ComponentsLibrary([
        new AXIComponent({Name: Interconnect.type, IsTopLevel: true}),
        new AXIComponent({Name: Gateway.type, IsTopLevel: true}),
        new AXIComponent({Name: RISCV.type, IsMaster: true}),
        new AXIComponent({Name: Register.type, IsSlave: true}),
        new AXIComponent({Name: MemoryBlock.type, IsSlave: true}),
    ])
    
    response.send(library.getComponents());
});

app.post("/soc/update", (request, response) => {
    const soc = request.body;
    console.log(JSON.stringify(soc, null, 2));
    response.send({});
});

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});
