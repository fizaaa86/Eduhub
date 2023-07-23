import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

const MyChatBot = ({active}) => {
  const [optionSelected, setOptionSelected] = useState(false);

  // Define the chat steps
  const steps = [
    {
      id: '1',
      message: 'Hello! How can I assist you today?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'How do I create an account?', trigger: '3' },
        { value: 2, label: 'What courses are available?', trigger: '4' },
        { value: 3, label: 'How can I contact support?', trigger: '5' },
      ],
    },
    {
      id: '3',
      message: 'To create an account, you can go to our website and click on the "Sign Up" button.',
      end: true,
    },
    {
      id: '4',
      message: 'We offer a wide range of courses in various subjects. You can explore our course catalog on our website.',
      end: true,
    },
    {
      id: '5',
      message: 'For support inquiries, you can reach out to our customer support team at support@eduhub.com.',
      end: true,
    },
  ];

  // Define the chatbot theme
  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: 'rgb(3, 111, 135)',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: 'rgba(0, 184, 248, 0.8)',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  // Custom function to handle option selection
  const handleOptionSelect = (option) => {
    setOptionSelected(true);
    return option;
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="chatbot-container">
        <ChatBot
          steps={steps}
          recognitionEnable={true}
          speechSynthesis={{ enable: true, lang: 'en' }}
        
          handleEnd={() => setOptionSelected(false)}
          handleUserInput={(input, steps, prevStep) => {
            if (input === '2' && !optionSelected) {
              setOptionSelected(true);
              return handleOptionSelect(input);
            }
            return input;
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default MyChatBot;
