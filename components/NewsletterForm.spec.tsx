import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NewsletterFormView } from "./NewsletterForm";

describe("NewsletterFormComponent", () => {
  it("should show success message when status===success", () => {
    const status = "success";
    const onSubmit = jest.fn();
    render(<NewsletterFormView status={status} onSubmit={onSubmit} />);

    const successMessage = screen.queryByText("isSuccess");
    expect(successMessage).toBeInTheDocument();
  });

  it("should NOT show success message when status!==success", () => {
    const status = "error";
    const onSubmit = jest.fn();
    render(<NewsletterFormView status={status} onSubmit={onSubmit} />);

    const successMessage = screen.queryByText("isSuccess");
    expect(successMessage).not.toBeInTheDocument();
  });

  it("should not call onSubmit when Subscribe button is clicked while email field is empty", () => {
    const status = "error";
    const onSubmit = jest.fn();
    render(<NewsletterFormView status={status} onSubmit={onSubmit} />);

    const button = screen.queryByText("Subscribe");
    if (button) {
      fireEvent.click(button);
    }

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should call onSubmit when Subscribe button is clicked and email field is filled", async () => {
    const status = "error";
    const onSubmit = jest.fn();
    render(<NewsletterFormView status={status} onSubmit={onSubmit} />);

    const input = screen.getByTestId("email-newsletter-input");
    if (input) {
      fireEvent.input(input, { target: { value: "mateusz@janowski.pl" } });
    }

    const button = screen.queryByText("Subscribe");
    if (button) {
      fireEvent.click(button);
    }
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });
});
