import axe from "axe-core";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { AuthLoginFooter, AuthRegisterFooter } from "./AuthFooter";

test("Accessibility check::AuthLoginFooter - User", async () => {
  const { container } = render(
    <AuthLoginFooter userType="user" />
  );
  const results = await axe.run(container);
  expect(results.violations.length).toBe(0);
});

test("Accessibility check::AuthLoginFooter - Artist", async () => {
  const { container } = render(
    <AuthLoginFooter userType="artist" />
  );
  const results = await axe.run(container);
  expect(results.violations.length).toBe(0);
});

test("Accessibility check::AuthRegisterFooter - User", async () => {
  const { container } = render(
    <AuthRegisterFooter userType="user" />
  );
  const results = await axe.run(container);
  expect(results.violations.length).toBe(0);
});

test("Accessibility check::AuthRegisterFooter - Artist", async () => {
  const { container } = render(
    <AuthRegisterFooter userType="artist" />
  );
  const results = await axe.run(container);
  expect(results.violations.length).toBe(0);
});
