// Exports
export * from './get-target-dom-element';
export * from './property-info';
export * from './validate-binding-behavior';
export * from './validate-result';
export * from './validate-trigger';
export * from './validation-controller';
export * from './validation-controller-factory';
export * from './validation-errors-custom-attribute';
export * from './validation-renderer-custom-attribute';
export * from './validator';
export * from './implementation/rules';
export * from './implementation/standard-validator';
export * from './implementation/validation-messages';
export * from './implementation/validation-parser';
export * from './implementation/validation-rules';
// Configuration
import { PLATFORM } from 'aurelia-pal';
import { Validator } from './validator';
import { StandardValidator } from './implementation/standard-validator';
import { ValidationParser } from './implementation/validation-parser';
import { ValidationRules } from './implementation/validation-rules';
/**
 * Aurelia Validation Configuration API
 */
export class AureliaValidationConfiguration {
    constructor() {
        this.validatorType = StandardValidator;
    }
    /**
     * Use a custom Validator implementation.
     */
    customValidator(type) {
        this.validatorType = type;
    }
    /**
     * Applies the configuration.
     */
    apply(container) {
        const validator = container.get(this.validatorType);
        container.registerInstance(Validator, validator);
    }
}
/**
 * Configures the plugin.
 */
export function configure(frameworkConfig, callback) {
    // the fluent rule definition API needs the parser to translate messages
    // to interpolation expressions.
    const parser = frameworkConfig.container.get(ValidationParser);
    ValidationRules.initialize(parser);
    // configure...
    const config = new AureliaValidationConfiguration();
    if (callback instanceof Function) {
        callback(config);
    }
    config.apply(frameworkConfig.container);
    // globalize the behaviors.
    if (frameworkConfig.globalResources) {
        frameworkConfig.globalResources(PLATFORM.moduleName('./validate-binding-behavior'), PLATFORM.moduleName('./validation-errors-custom-attribute'), PLATFORM.moduleName('./validation-renderer-custom-attribute'));
    }
}
