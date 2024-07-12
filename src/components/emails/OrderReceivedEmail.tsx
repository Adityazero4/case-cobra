import { ShippingAddress } from "@prisma/client";
import React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import {
  adressTitle,
  container,
  footer,
  globalEmail,
  main,
  message,
  paddingY,
  track,
} from "@/styles/EmailStyles";

const OrderReceivedEmail = ({
  shippingAddress,
  orderId,
  orderDate,
}: {
  shippingAddress: ShippingAddress;
  orderId: string;
  orderDate: string;
}) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://case-cobra-beta.vercel.app";
  return (
    <Html>
      <Head />
      <Preview>Your order summary and estimated delivery date</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={message}>
            <Img
              src={`${baseUrl}/snake-3.png`}
              width={65}
              height={73}
              alt="Snake logo"
              style={{
                margin: "auto",
              }}
            />
            <Heading style={globalEmail.heading}>
              Thank you for your order!
            </Heading>
            <Text style={globalEmail.text}>
              We're preparing everything for delivery and will notify you once
              your package has been shipped. Delivery usually takes 2 days.
            </Text>
            <Text style={{ ...globalEmail.text, marginTop: 24 }}>
              If you have any questions regarding your order, please feel free
              to contact us with your order number and we're here to help.
            </Text>
          </Section>
          <Hr style={globalEmail.hr} />
          <Section style={globalEmail.defaultPadding}>
            <Text style={adressTitle}>Shipping to: {shippingAddress.name}</Text>
            <Text style={{ ...globalEmail.text, fontSize: 14 }}>
              {shippingAddress.street}, {shippingAddress.city},{" "}
              {shippingAddress.state} {shippingAddress.postalCode}
            </Text>
          </Section>
          <Hr style={globalEmail.hr} />
          <Section style={globalEmail.defaultPadding}>
            <Row style={{ display: "inline-flex gap-16", marginBottom: 40 }}>
              <Column style={{ width: 170 }}>
                <Text style={globalEmail.paragraphWithBold}>Order Number</Text>
                <Text style={track.number}>{orderId}</Text>
              </Column>
              <Column style={{ marginLeft: 20 }}>
                <Text style={globalEmail.paragraphWithBold}>Order Date</Text>
                <Text style={track.number}>{orderDate}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={globalEmail.hr} />

          <Section style={paddingY}>
            <Row>
              <Text
                style={{
                  ...footer.text,
                  paddingTop: 30,
                  paddingBottom: 30,
                }}
              >
                Please contact us if you have any questions. (If you reply to
                this email, we won't be able to see it.)
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>
                © CaseCobra, Inc. All Rights Reserved.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderReceivedEmail;
