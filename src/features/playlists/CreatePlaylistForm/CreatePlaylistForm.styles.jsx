import styled from "styled-components";
import { Button } from "../../../styles/button.js";
import { FormGroup, Input, Textarea, Label } from "../../../styles/form.js";

export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  width: 100%;
  align-items: flex-start;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightColumn = styled.div`
  padding-top: 72px;
`;

/* -----------------------------
   WRAPPER
----------------------------- */
export const FormWrapper = styled.form`
  display: grid;
  gap: 24px;
  max-width: 700px;
`;

/* -----------------------------
   FORM GROUP
----------------------------- */
export { FormGroup, Label, Input, Textarea };

/* -----------------------------
   SUBMIT BUTTON
----------------------------- */
export const SubmitButton = styled(Button)`
  width: fit-content;
  margin-top: 12px;
`;
