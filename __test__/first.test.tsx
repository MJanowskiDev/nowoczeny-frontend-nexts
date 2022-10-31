import { render, screen } from "@testing-library/react";
import { NextMarkdown } from "../components/NextMarkdown";

import { serialize } from "next-mdx-remote/serialize";

describe("Home", () => {
  it("renders a heading", async () => {
    const mdString = "[External Link](https://external.link)";
    const mdx = await serialize(mdString);

    render(<NextMarkdown>{mdx}</NextMarkdown>);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
