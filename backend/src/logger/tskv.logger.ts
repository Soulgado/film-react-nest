import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger extends LoggerService {
    private formatTskvMessage(level: string, message: any, optionalParams: Record<string, any>) {
        const fields = {
            level,
            message,
            ...optionalParams
        };

        return Object.entries(fields)
            .map(([key, value]) => {
                return `${key}=${value.toString()}`
            })
            .join('\t') + '\n';
    }

    log(message: string, ...optionalParams: Record<string, any>) {
        console.log(this.formatTskvMessage('log', message, optionalParams));
    }

    warn(message: string, ...optionalParams: Record<string, any>) {
        console.log(this.formatTskvMessage('warn', message, optionalParams));
    }

    error(message: string, ...optionalParams: Record<string, any>) {
        console.log(this.formatTskvMessage('error', message, optionalParams));
    }
}