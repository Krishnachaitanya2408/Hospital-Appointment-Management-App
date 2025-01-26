import styled from "styled-components";

const InputWrapper = styled.div`
    position: relative;
        display: flex;
        align-items: center;
`;

const IconWrapper = styled.div`
    position: absolute;
    left: 0.75rem;
    color: #9ca3af;
`;

const StyledInput = styled.input`
    padding: 0.75rem 1rem;
    padding-left: 2.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    outline: none;
    width: 100%;
    &:focus {
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        border-color: #007bff;
    }
`;


const Input = ({ icon, ...props }) => {
  return (
    <InputWrapper>
      {icon && (
        <IconWrapper>
          {icon}
        </IconWrapper>
      )}
      <StyledInput {...props} />
    </InputWrapper>
  );
};

export default Input;