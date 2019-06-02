import React from "react";
import { create } from "react-test-renderer";
import Loading from "../../components/loading/index";
describe("Loading component", () => {
  test("it matches the snapshot", () => {
    const component = create(<Loading />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
