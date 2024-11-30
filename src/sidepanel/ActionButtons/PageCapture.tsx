import React from "react";
import { ActionButton } from "./ActionButton";
import { useContext, useState } from "react";
import { AppContext } from "../../utils/app-context";
import { AppMessageCaptureVisibleScreen } from "../../utils/types";
import { ActionIcon } from "@mantine/core";
import { IconCamera, IconCheck } from "@tabler/icons-react";

interface PageCaptureProps {
  compact?: boolean;
  hasImage?: boolean;
}

export function PageCapture({ compact = false, hasImage = false }: PageCaptureProps): JSX.Element {
  const { handleImageCapture } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const imageData =
      await chrome.runtime.sendMessage<AppMessageCaptureVisibleScreen>({
        type: "any_capture-visible-screen",
      });
    handleImageCapture(imageData);
    setIsLoading(false);
  };

  if (compact) {
    return (
      <ActionIcon
        loading={isLoading}
        variant="filled"
        size="lg"
        onClick={handleClick}
        color={hasImage ? "green" : "blue"}
      >
        {hasImage ? <IconCheck size="1.1rem" /> : <IconCamera size="1.1rem" />}
      </ActionIcon>
    );
  }

  return (
    <ActionButton
      label="Screenshot visible page"
      onClick={handleClick}
      notificationMessage="Page captured!"
      isLoading={isLoading}
    />
  );
}
