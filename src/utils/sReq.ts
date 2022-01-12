import { AuthRequest } from "@/Auth/interfaces/authRequest.interface";
import { Request } from "express";

export type sRequest = Request & AuthRequest