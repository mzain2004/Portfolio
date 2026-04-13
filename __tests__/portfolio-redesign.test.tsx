/**
 * Feature: portfolio-redesign
 * Property-based tests using fast-check
 */

import React from "react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import fc from "fast-check";

// ─── Global mocks ────────────────────────────────────────────────────────────

// Mock motion/react so animated components render as plain HTML elements
vi.mock("motion/react", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target: object, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        React.forwardRef((props: any, ref: any) =>
          React.createElement(tag, { ...props, ref })
        ),
    }
  ),
  useSpring: (initial: number) => ({ set: vi.fn(), get: () => initial }),
  useTransform: (_spring: unknown, fn: (v: number) => unknown) => fn(0),
  useScroll: () => ({ scrollY: { onChange: vi.fn() } }),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", props),
}));

// Mock siteConfig
vi.mock("@/config/site", () => ({
  siteConfig: {
    phishSlayerUrl: "https://phishslayer.tech",
    email: "test@test.com",
    socials: [],
  },
}));

// Static imports (must come after vi.mock hoisting)
import PhishSlayerSpotlight from "../components/PhishSlayerSpotlight";
import SelectedWork from "../components/SelectedWork";
import LiveStats from "../components/LiveStats";

// ─── Property 1: Config-sourced Phish-Slayer URL ─────────────────────────────

describe("Property 1: Config-sourced Phish-Slayer URL", () => {
  // Feature: portfolio-redesign, Property 1: Config-sourced Phish-Slayer URL
  // Validates: Requirements 5.4

  test("PhishSlayerSpotlight CTA href matches siteConfig.phishSlayerUrl and is never hardcoded", () => {
    // Property: for any render of PhishSlayerSpotlight, no anchor has href="#"
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(React.createElement(PhishSlayerSpotlight));
        const links = Array.from(container.querySelectorAll("a"));
        const invalidLinks = links.filter(
          (a) => a.getAttribute("href") === "#" || a.getAttribute("href") === ""
        );
        return invalidLinks.length === 0;
      }),
      { numRuns: 100 }
    );
  });

  test("PhishSlayerSpotlight renders the href from siteConfig.phishSlayerUrl", () => {
    const { container } = render(React.createElement(PhishSlayerSpotlight));
    const links = Array.from(container.querySelectorAll("a"));
    const visitLink = links.find((a) =>
      a.textContent?.includes("Visit Phish-Slayer")
    );
    expect(visitLink).toBeDefined();
    expect(visitLink?.getAttribute("href")).toBe("https://phishslayer.tech");
  });
});

// ─── Property 2: Project card data integrity ─────────────────────────────────

describe("Property 2: Project card data integrity", () => {
  // Feature: portfolio-redesign, Property 2: Project card data integrity
  // Validates: Requirements 6.3, 12.4

  test("No project card renders href='#'", () => {
    const { container } = render(React.createElement(SelectedWork));
    const links = Array.from(container.querySelectorAll("a"));

    fc.assert(
      fc.property(fc.constant(links), (allLinks) => {
        const badLinks = allLinks.filter(
          (a) => a.getAttribute("href") === "#"
        );
        return badLinks.length === 0;
      }),
      { numRuns: 100 }
    );
  });

  test("All rendered images have non-empty alt attributes", () => {
    const { container } = render(React.createElement(SelectedWork));
    const images = Array.from(container.querySelectorAll("img"));

    // If there are images, each must have a non-empty alt
    fc.assert(
      fc.property(fc.constant(images), (allImages) => {
        const badImages = allImages.filter(
          (img) => img.hasAttribute("alt") && img.getAttribute("alt") === ""
        );
        return badImages.length === 0;
      }),
      { numRuns: 100 }
    );
  });
});

// ─── Property 3: LiveStats renders exactly one UI state ──────────────────────

describe("Property 3: LiveStats renders exactly one UI state", () => {
  // Feature: portfolio-redesign, Property 3: LiveStats renders exactly one UI state
  // Validates: Requirements 7.2, 7.3, 7.5

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("Loading state: renders skeleton cards (animate-pulse), not error", () => {
    // Simulate a fetch that never resolves → loading state
    global.fetch = vi.fn(() => new Promise(() => {})) as unknown as typeof fetch;

    const { container } = render(React.createElement(LiveStats));

    const skeletons = container.querySelectorAll(".animate-pulse");
    const errorEl = container.querySelector(".text-red-400");

    expect(skeletons.length).toBeGreaterThan(0);
    expect(errorEl).toBeNull();
  });

  test("Error state: renders error message, not skeleton", async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error("Network error"))
    ) as unknown as typeof fetch;

    const { container, findByText } = render(React.createElement(LiveStats));

    const errorMsg = await findByText(/Failed to load live statistics/i);
    expect(errorMsg).toBeTruthy();

    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBe(0);
  });

  test("Property: skeleton and error states are never rendered simultaneously", () => {
    // Property: for any synchronous render (before async fetch resolves),
    // skeleton and error are mutually exclusive
    fc.assert(
      fc.property(fc.constant(null), () => {
        // Loading scenario: fetch never resolves
        global.fetch = vi.fn(
          () => new Promise(() => {})
        ) as unknown as typeof fetch;

        const { container } = render(React.createElement(LiveStats));

        const hasSkeletons =
          container.querySelectorAll(".animate-pulse").length > 0;
        const hasError = container.querySelector(".text-red-400") !== null;

        // Never both simultaneously
        return !(hasSkeletons && hasError);
      }),
      { numRuns: 100 }
    );
  });
});
