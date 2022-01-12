import { config } from "@/Config/environment";

export class Geolocation {
  static apiKey = config.google.locationApiKey

  public static async locate(address: string) {
    const fetch = await Function('return import("node-fetch")')() as typeof import('node-fetch')
    const response = await fetch.default(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.apiKey}&components=postal_code`)
    return response.json() as Promise<{
      results: {
        address_components: {
          long_name: string,
          short_name: string,
          types: string[]
        }[]
      }[]
    }>
  }

  public static async isOnNY(address: string) {
    const locateResult = await this.locate(address)
    return Boolean(locateResult?.results.find(i => i.address_components.find(j => j.short_name === 'NY' && j.types.includes('administrative_area_level_1'))))
  }
}