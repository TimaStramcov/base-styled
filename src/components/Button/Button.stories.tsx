import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Button from "./Button";
export default {
  title: "Button",
  component: Button,
} as Meta;
export const Base: Story = () => <Button text="Default" type="default"/>;
export const Shadow: Story = () => <Button text="Shadow" type="shadow"/>;