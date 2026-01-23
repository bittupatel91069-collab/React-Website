import React from "react";
import {
  Modal,
  Form,
  Button,
  VStack,
  HStack,
  Text,
  Schema,
  Message,
  Tag,
} from "rsuite";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Name required"),
  email: StringType().isEmail("Invalid email").isRequired("Email required"),
  mobile: StringType()
    .pattern(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .isRequired("Mobile number required"),
  address1: StringType().isRequired("Address Line 1 required"),
  address2: StringType(),
  city: StringType().isRequired("City required"),
  state: StringType().isRequired("State required"),
  zip: StringType()
    .pattern(/^\d{6}$/, "ZIP/Postal code must be exactly 6 digits")
    .isRequired("ZIP/Postal code required"),
});

interface OrderModalProps {
  open: boolean;
  selected: any;
  formValue: any;
  setFormValue: (val: any) => void;
  formError: any;
  setFormError: (err: any) => void;
  formRef: React.RefObject<any>;
  onClose: () => void;
  onSubmit: () => void;
  loading?: boolean;
}

const OrderModal: React.FC<OrderModalProps> = ({
  open,
  selected,
  formValue,
  setFormValue,
  formError,
  setFormError,
  formRef,
  onClose,
  onSubmit,
  loading = false,
}) => (
  <Modal open={open} onClose={onClose} size="sm">
    <Modal.Body>
      {/* Product Name and Price (Read-only) */}
      <VStack style={{ marginBottom: 6 }}>
        <HStack spacing={16} alignItems="center">
          <Text as="span" weight="bold">
            Product :
          </Text>
          <Text as="span">{selected?.title || "-"}</Text>
        </HStack>
        <HStack spacing={16} alignItems="center">
          <Text as="span" weight="bold">
            Price :
          </Text>
          <Tag color="blue" size="md">
            {selected?.price != null ? `₹${selected.price}` : "-"}
          </Tag>
        </HStack>
      </VStack>
      <Form
        ref={formRef}
        fluid
        model={model}
        formValue={formValue}
        onChange={setFormValue}
        onCheck={setFormError}
      >
        <Form.Group controlId="name">
          <Form.ControlLabel>Name</Form.ControlLabel>
          <Form.Control name="name" />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" placeholder="example@example.com" />
        </Form.Group>
        <Form.Group controlId="mobile">
          <Form.ControlLabel>Mobile Number</Form.ControlLabel>
          <Form.Control
            name="mobile"
            placeholder="10-digit mobile number"
            type="tel"
            maxLength={10}
            pattern="\d*"
          />
        </Form.Group>
        <VStack spacing={12} style={{ width: "100%" }}>
          <Form.Group controlId="address1">
            <Form.ControlLabel>Address Line 1</Form.ControlLabel>
            <Form.Control
              name="address1"
              placeholder="Street address, P.O. box, company name, c/o"
            />
          </Form.Group>
          <Form.Group controlId="address2">
            <Form.ControlLabel>Address Line 2</Form.ControlLabel>
            <Form.Control
              name="address2"
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
          </Form.Group>
          <HStack
            spacing={12}
            alignItems="flex-start"
            style={{ width: "100%" }}
          >
            <Form.Group controlId="city" style={{ flex: 1 }}>
              <Form.ControlLabel>City</Form.ControlLabel>
              <Form.Control name="city" />
            </Form.Group>
            <Form.Group controlId="state" style={{ flex: 1 }}>
              <Form.ControlLabel>State</Form.ControlLabel>
              <Form.Control name="state" />
            </Form.Group>
          </HStack>
          <Form.Group controlId="zip">
            <Form.ControlLabel>ZIP/Postal Code</Form.ControlLabel>
            <Form.Control
              name="zip"
              placeholder="6-digit postal code"
              type="tel"
              maxLength={6}
              pattern="\d*"
            />
          </Form.Group>
        </VStack>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button
        appearance="primary"
        onClick={onSubmit}
        loading={loading}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
      <Button appearance="subtle" onClick={onClose} disabled={loading}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);

export default OrderModal;
