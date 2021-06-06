
import provider from "@/interfaces/provider.interface";
import NotificationProvider from "@/providers/notification.provider";
import SMSProvider from "@/providers/sms.provider";


const types: { [key: string]: provider } = {
    P : new NotificationProvider,
    S : new SMSProvider,
}

export class ProviderFactory {

    public static createProvider(name: string): provider {
        const providerClass: provider = types[name];
        return providerClass;
    }

}
