import React, { useState } from "react";
import {
  Box,
  Button,
  Loader,
  Notification,
  Stack,
  Group,
  Image,
  Text,
  ActionIcon,
  Switch,
} from "@mantine/core";
import { QuestionTextArea } from "../common/QuestionTextArea";
import { useEffect, useRef } from "react";
import { useForm } from "@mantine/form";
import { Message } from "./Message";
import { useScrollIntoView } from "@mantine/hooks";
import { QueryMode, ModelConfig, ChatMessage } from "../utils/types";
import { IconX } from "@tabler/icons-react";
import { PageCapture } from "./ActionButtons/PageCapture";

interface ChatUIProps {
  messages: ChatMessage[];
  isLoading: boolean;
  disableInput: boolean;
  error: string;
  queryMode: QueryMode;
  modelConfig: ModelConfig | null;
  imageData: string | null;
  setError: (error: string) => void;
  clearChatContext: () => void;
  processUserPrompt: (prompt: string) => Promise<void>;
  stopPromptProcessing: () => void;
  setQueryMode: (mode: QueryMode) => void;
  clearImageData: () => void;
}

export const ChatUI = ({
  messages,
  isLoading,
  disableInput,
  error,
  queryMode,
  modelConfig,
  imageData,
  setError,
  clearChatContext,
  processUserPrompt,
  stopPromptProcessing,
  setQueryMode,
  clearImageData,
}: ChatUIProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { scrollIntoView, scrollableRef, targetRef } =
    useScrollIntoView<HTMLDivElement>({
      offset: 100,
    });

  const form = useForm({
    initialValues: {
      question: "",
    },
    validate: {
      question: (value) =>
        value.trim().length < 2 ? "Must have at least 2 characters" : null,
    },
  });

  const handleEnterKey = (event: KeyboardEvent) => {
    event.preventDefault();
    form.validate();
    formRef.current?.requestSubmit();
  };

  useEffect(() => {
    setShowLoader(isLoading);
    if (!isLoading) {
      setHasScrolled(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      setShowLoader(false);
    }
  }, [error]);

  const handleFormSubmit = async (values: { question: string }) => {
    setShowLoader(true);
    form.reset();
    await processUserPrompt(values.question.trim());
  };

  const handleSegmentedControlChange = (value: QueryMode) => {
    setQueryMode(value);
    clearImageData();
  };

  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    if (
      lastMessage &&
      !hasScrolled &&
      (lastMessage.role === "human" || lastMessage.queryMode === "summary")
    ) {
      scrollIntoView();
      setHasScrolled(true);
    }
  }, [lastMessage, queryMode, hasScrolled, scrollIntoView]);

  return (
    <Box
      mt="8px"
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Stack
        mb="4px"
        pb="36px"
        spacing="xs"
        sx={{ flex: 1, overflow: "scroll" }}
        ref={scrollableRef}
      >
        {messages.slice(0, -1).map((message, index) => {
          if (!message.content) {
            return null;
          }
          return (
            <Message
              key={index}
              role={message.role}
              content={message.content}
            />
          );
        })}
        {lastMessage && (
          <Message
            ref={targetRef}
            role={lastMessage.role}
            content={lastMessage.content}
          />
        )}
      </Stack>
      {showLoader && (
        <Box sx={{ textAlign: "center" }}>
          <Loader variant="dots" mb="8px" />
        </Box>
      )}
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        {error && (
          <Notification
            color="red"
            title="Error"
            onClose={() => setError("")}
            sx={{
              marginBottom: "8px",
            }}
          >
            {error}
          </Notification>
        )}
        <form ref={formRef} onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack spacing="xs" sx={{ background: 'white', borderTop: '1px solid #eee', padding: '8px' }}>
            {isLoading ? (
              <Group position="center">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={stopPromptProcessing}
                >
                  Stop
                </Button>
              </Group>
            ) : null}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Box sx={{ flex: 1 }}>
                <QuestionTextArea
                  form={form}
                  handleEnterKey={handleEnterKey}
                  disableInput={disableInput}
                  required
                />
              </Box>
              <Group spacing="xs" noWrap>
                <Button
                  size="xs"
                  variant="subtle"
                  color="gray"
                  onClick={clearChatContext}
                  disabled={disableInput}
                  compact
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  disabled={disableInput}
                  size="xs"
                  compact
                >
                  Send
                </Button>
                <PageCapture compact hasImage={!!imageData} />
              </Group>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};
