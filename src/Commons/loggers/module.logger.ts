import { Injectable, Scope, Logger } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class ModuleLogger extends Logger {
  protected context: string;
  protected file: string;

  public setContext(context: string) {
    this.context = context;
  }

  public setFile(file: string) {
    this.file = file;
  }

  public error(message: string, error: any, metadata: any = {}) {
    const { funcName, ...rest } = metadata;
    const { stack } = error;
    super.error(
      {
        message,
        metadata: rest,
      },
      stack,
      { context: this.context, file: this.file, funcName }
    );
  }

  public warn(message: string, metadata: any = {}) {
    const { funcName, ...rest } = metadata;
    super.warn(
      { message, metadata: rest },
      { context: this.context, file: this.file, funcName }
    );
  }

  public log(message: string, metadata: any = {}) {
    const { funcName, ...rest } = metadata;
    super.log(
      { message, metadata: rest },
      { context: this.context, file: this.file, funcName }
    );
  }
}
