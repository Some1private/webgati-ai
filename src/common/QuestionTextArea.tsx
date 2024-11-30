import React from "react";
import { Textarea } from "@mantine/core";

interface QuestionTextAreaProps {
  form: any;
  handleEnterKey: (event: KeyboardEvent) => void;
  label?: string;
  placeholder?: string;
  disableInput?: boolean;
  required?: boolean;
}

export function QuestionTextArea({
  form,
  handleEnterKey,
  label = "",
  placeholder = "Ask a question",
  disableInput = false,
  required = false,
}: QuestionTextAreaProps): JSX.Element {
  return (
    <Textarea
      label={label}
      placeholder={placeholder}
      minRows={1}
      autosize
      onKeyDown={(event) => {
        if (disableInput) {
          return;
        }
        if (event.key !== "Enter") {
          event.stopPropagation();
        } else if (event.shiftKey) {
          // Shift + Enter, move to a new line
          event.stopPropagation();
        } else {
          handleEnterKey(event as unknown as KeyboardEvent);
        }
      }}
      required={required}
      styles={(theme) => ({
        input: {
          border: 'none',
          backgroundColor: 'transparent',
          '&:focus': {
            border: 'none',
            outline: 'none',
          },
          padding: '8px 0',
          fontSize: '14px',
        },
        wrapper: {
          border: 'none',
        }
      })}
      {...form.getInputProps("question")}
    />
  );
}
