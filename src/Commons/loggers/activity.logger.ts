import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ActivityLogger extends Logger {
  public logAction(
    context: string,
    adminId: string,
    adminEmail: string,
    action: string,
    resource?: string,
    resourceId?: string
  ) {
    const message = {
      date: new Date(),
      adminId: adminId,
      adminEmail: adminEmail,
      action: action,
      resource: resource,
      resourceId: resourceId,
    };

    super.log(message, context);
  }
}
