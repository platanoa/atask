import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { SearchBox } from "./index";

describe("SearchBox", () => {
  it("renders a search input element", () => {
    render(<SearchBox />);
    const inputElement = screen.getByRole("searchbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onChange callback when input value changes", () => {
    const onChangeMock = jest.fn();
    render(<SearchBox onChange={onChangeMock} />);
    const inputElement = screen.getByRole("searchbox");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "test" }),
      })
    );
  });

  it("applies custom class name to the search input", () => {
    render(<SearchBox className="custom-classname" />);
    const inputElement = screen.getByRole("searchbox");
    expect(inputElement).toHaveClass("custom-classname");
  });
});