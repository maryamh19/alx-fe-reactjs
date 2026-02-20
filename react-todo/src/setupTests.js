import "@testing-library/jest-dom";
import { JSDOM } from "jsdom";

// Initialize JSDOM once
const dom = new JSDOM("<!DOCTYPE html><html><body><div id='root'></div></body></html>", {
  url: "http://localhost",
});

// Set global variables
Object.defineProperty(global, "document", {
  value: dom.window.document,
  writable: false,
});

Object.defineProperty(global, "window", {
  value: dom.window,
  writable: false,
});

Object.defineProperty(global, "navigator", {
  value: dom.window.navigator,
  writable: false,
});

global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;
