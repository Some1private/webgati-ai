import React from "react";
import { Anchor, Box, PasswordInput, Stack } from "@mantine/core";
import { ModelProvider } from "../utils/types";

interface OpenRouterFormFieldsProps {
  form: any;
  modelProvider: ModelProvider;
}

export const OpenRouterFormFields = ({
  form,
  modelProvider,
}: OpenRouterFormFieldsProps): JSX.Element => {
  return (
    <Box>
      <Stack spacing="sm">
        <PasswordInput
          label="OpenRouter API Key"
          required
          {...form.getInputProps(`${modelProvider}.apiKey`)}
        />
        <Anchor
          href="https://openrouter.ai/keys"
          target="_blank"
          size="xs"
        >
          Get your own OpenRouter API Key
        </Anchor>
      </Stack>
    </Box>
  );
}; 