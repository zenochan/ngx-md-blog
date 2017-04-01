"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EventsService = (function () {
    function EventsService() {
        this._channels = [];
    }
    /**
     * Subscribe to an event topic. Events that get posted to that topic will trigger the provided handler.
     *
     * @param {string} topic the topic to subscribe to
     * @param {function} handler the event handler
     */
    EventsService.prototype.subscribe = function (topic) {
        var _this = this;
        var handlers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlers[_i - 1] = arguments[_i];
        }
        if (!this._channels[topic]) {
            this._channels[topic] = [];
        }
        handlers.forEach(function (handler) {
            _this._channels[topic].push(handler);
        });
    };
    /**
     * Unsubscribe from the given topic. Your handler will no longer receive events published to this topic.
     *
     * @param {string} topic the topic to unsubscribe from
     * @param {function} handler the event handler
     *
     * @return true if a handler was removed
     */
    EventsService.prototype.unsubscribe = function (topic, handler) {
        if (handler === void 0) { handler = null; }
        var t = this._channels[topic];
        if (!t) {
            // Wasn't found, wasn't removed
            return false;
        }
        if (!handler) {
            // Remove all handlers for this topic
            delete this._channels[topic];
            return true;
        }
        // We need to find and remove a specific handler
        var i = t.indexOf(handler);
        if (i < 0) {
            // Wasn't found, wasn't removed
            return false;
        }
        t.splice(i, 1);
        // If the channel is empty now, remove it from the channel map
        if (!t.length) {
            delete this._channels[topic];
        }
        return true;
    };
    /**
     * Publish an event to the given topic.
     *
     * @param {string} topic the topic to publish to
     * @param {any} eventData the data to send as the event
     */
    EventsService.prototype.publish = function (topic) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var t = this._channels[topic];
        if (!t) {
            return null;
        }
        var responses = [];
        t.forEach(function (handler) {
            responses.push(handler.apply(void 0, args));
        });
        return responses;
    };
    return EventsService;
}());
EventsService = __decorate([
    core_1.Injectable()
], EventsService);
exports.EventsService = EventsService;
