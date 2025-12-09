import { useForm, type SubmitHandler } from "react-hook-form";
import type { Email, submittingStatus } from "../../types";
import { useSendEmail } from "../../hooks/useUser";
import {
  Alert,
  Button,
  TextInput,
  Textarea,
  Title,
  Paper,
  Stack,
} from "@mantine/core";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface ContactFormProps {
  subject: string;
  text: string;
}

const ContactMeForm = () => {
  const { user } = useAuth0();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormProps>({
    defaultValues: {
      subject: "",
      text: "",
    },
  });

  const [submitStatus, setSubmitStatus] = useState<submittingStatus>("idle");

  const emailSending = useSendEmail();

  const onSubmit: SubmitHandler<ContactFormProps> = (data) => {
    setSubmitStatus("idle");

    const { subject, text } = data;

    const EmailSubmission: Email = {
      subject: subject.trim(),
      text: text.trim(),
      userEmail: user?.email || "",
    };

    emailSending.mutate(EmailSubmission, {
      onSuccess: () => {
        setSubmitStatus("success");
        reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      },
      onError: (error) => {
        setSubmitStatus("error");
        console.error(error);
      },
    });
  };

  return (
    <>
      {submitStatus === "success" && (
        <Alert
          color="green"
          withCloseButton
          onClose={() => setSubmitStatus("idle")}
          mb="md"
        >
          Email sent successfully! We'll get back to you soon.
        </Alert>
      )}
      {submitStatus === "error" && (
        <Alert
          color="red"
          withCloseButton
          onClose={() => setSubmitStatus("idle")}
          mb="md"
        >
          Failed to send email. Please try again later.
        </Alert>
      )}
      <Paper
        shadow="lg"
        p="xl"
        radius="md"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title order={3} mb="lg" fw={700}>
          Contact Me
        </Title>
        <Stack gap="lg">
          <TextInput
            label="Subject"
            placeholder="Enter subject..."
            error={errors.subject?.message}
            disabled={emailSending.isPending}
            {...register("subject", {
              required: "Subject is required",
              maxLength: {
                value: 50,
                message: "Subject must be less than 50 characters",
              },
            })}
          />
          <Textarea
            label="Message"
            rows={5}
            placeholder="Describe your feedback, question, or issue..."
            error={errors.text?.message}
            disabled={emailSending.isPending}
            {...register("text", {
              required: "Message is required",
              maxLength: {
                value: 250,
                message: "Message must be less than 250 characters",
              },
            })}
          />
          <Button
            disabled={emailSending.isPending}
            type="submit"
            fullWidth
            size="lg"
            loading={emailSending.isPending}
            loaderProps={{ type: "dots" }}
          >
            {emailSending.isPending ? "Sending..." : "Send Email"}
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default ContactMeForm;
