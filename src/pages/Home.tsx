import React from 'react';
import { Card, Typography } from 'antd';
import styled from '@emotion/styled';

const { Title, Paragraph } = Typography;

const StyledCard = styled(Card)`
  margin: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Home: React.FC = () => {
  return (
    <StyledCard>
      <Title>Welcome to My Beautiful App</Title>
      <Paragraph>
        This is a beautifully designed application using Ant Design and styled with
        Emotion.
      </Paragraph>
    </StyledCard>
  );
};

export default Home;
