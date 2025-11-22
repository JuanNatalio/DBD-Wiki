import { useForm, type SubmitHandler } from "react-hook-form";
import type { Email, submittingStatus } from "../../types";
import { useSendEmail } from "../../hooks/useUser";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
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
          variant="success"
          dismissible
          onClose={() => setSubmitStatus("idle")}
          className="mb-4"
        >
          Email sent successfully! We'll get back to you soon.
        </Alert>
      )}
      {submitStatus === "error" && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setSubmitStatus("idle")}
          className="mb-4"
        >
          Failed to send email. Please try again later.
        </Alert>
      )}
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-lg border-0 p-5 rounded"
      >
        <h3 className="mb-4 fw-bold">Contact Me</h3>
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Subject</Form.Label>
          <Form.Control
            placeholder="Enter subject..."
            isInvalid={!!errors.subject}
            disabled={emailSending.isPending}
            {...register("subject", {
              required: "Subject is required",
              maxLength: {
                value: 50,
                message: "Subject must be less than 50 characters",
              },
            })}
          />
          {errors.subject && (
            <Form.Control.Feedback type="invalid">
              {errors.subject.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Describe your feedback, question, or issue..."
            isInvalid={!!errors.text}
            disabled={emailSending.isPending}
            {...register("text", {
              required: "Message is required",
              maxLength: {
                value: 250,
                message: "Message must be less than 250 characters",
              },
            })}
          />
          {errors.text && (
            <Form.Control.Feedback type="invalid">
              {errors.text.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button
          disabled={emailSending.isPending}
          type="submit"
          className="w-100 shadow-sm"
          size="lg"
        >
          {emailSending.isPending ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                className="me-2"
              />
              Sending...
            </>
          ) : (
            "Send Email"
          )}
        </Button>
      </Form>
    </>
  );
};

export default ContactMeForm;
