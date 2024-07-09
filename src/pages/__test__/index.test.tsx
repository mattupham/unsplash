import Home from "@/pages/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

describe("Home", () => {
  it("renders a heading", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("updates search query on form submit", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const searchInput = screen.getByPlaceholderText("Search photos...");
    fireEvent.change(searchInput, { target: { value: "nature" } });
    fireEvent.submit(searchInput);

    expect(screen.getByDisplayValue("nature")).toBeInTheDocument();
  });
});
