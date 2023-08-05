export class NetlifyIntegrationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetlifyIntegrationError';
  }
}
export const wrap = (...handlers) => (functionHandler, config) => handlers.reduceRight((handler, integration) => integration(handler, config), functionHandler);