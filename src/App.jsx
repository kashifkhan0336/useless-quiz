import React, { useCallback, useState, useRef, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Radio,
  Statistic,
  Space,
  Typography,
  Button,
  Modal,
  Table,
} from "antd";
const { Countdown } = Statistic;
const { Title } = Typography;
import { nanoid } from "nanoid";

function App() {
  localStorage.clear();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const quiz_questions = [
    {
      question_id: nanoid(),
      question_text: "What your name?",
      option: [
        {
          text: "Kashif Khan",
          isCorrect: true,
        },
        {
          text: "Maaz Khan",
          isCorrect: false,
        },
        {
          text: "Fawad Khan",
          isCorrect: false,
        },
        {
          text: "Rashid Khan",
          isCorrect: false,
        },
      ],
    },
    {
      question_id: nanoid(),
      question_text: "What your age?",
      option: [
        {
          text: "18",
          isCorrect: true,
        },
        {
          text: "17",
          isCorrect: false,
        },
        {
          text: "15",
          isCorrect: false,
        },
        {
          text: "13",
          isCorrect: false,
        },
      ],
    },
    {
      question_id: nanoid(),
      question_text: "What your name?",
      option: [
        {
          text: "Kashif Khan",
          isCorrect: true,
        },
        {
          text: "Maaz Khan",
          isCorrect: false,
        },
        {
          text: "Fawad Khan",
          isCorrect: false,
        },
        {
          text: "Rashid Khan",
          isCorrect: false,
        },
      ],
    },
    {
      question_id: nanoid(),
      question_text: "What your name?",
      option: [
        {
          text: "Kashif Khan",
          isCorrect: true,
        },
        {
          text: "Maaz Khan",
          isCorrect: false,
        },
        {
          text: "Fawad Khan",
          isCorrect: false,
        },
        {
          text: "Rashid Khan",
          isCorrect: false,
        },
      ],
    },
  ];
  const [isDisabled, setDisabled] = useState(false);
  const submitBtn = useRef();
  const [deadline, setDeadline] = useState(Date.now() + 1000 * 25);
  const [countdownFinished, setCountdownFinish] = useState(false);
  const [results, setResults] = useState([]);
  function onCountDownFinishFunction(data) {
    console.log(data);
    localStorage.setItem(data.q_id, JSON.stringify(data));
  }

  function allStorage() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    return values;
  }
  const columns = [
    {
      title: "Question",
      dataIndex: "question_text",
      key: "question_text",
    },
    {
      title: "Your Answer",
      dataIndex: "userSelected",
      key: "userSelected",
    },
    {
      title: "Correct Answer",
      dataIndex: "correctOption",
      key: "correctOption",
    },
  ];
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Countdown
        title="Million Seconds"
        value={deadline}
        format="HH:mm:ss:SSS"
        onFinish={() => {
          setCountdownFinish(true);
          setDeadline(Date.now());
          setDisabled(true);
          setResults(() => allStorage());
          showModal();
        }}
      />
      {quiz_questions.map((q, index) => {
        return (
          <Question
            key={index}
            onCountDownFinish={countdownFinished}
            onCountDownFinishFunction={onCountDownFinishFunction}
            question={q}
            isDisabled={isDisabled}
          />
        );
      })}
      <Modal
        title="Results"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1500}
      >
        <Results />
      </Modal>
      <Button
        style={{ display: "inline" }}
        onClick={() => {
          setCountdownFinish(true);
          setDeadline(Date.now());
          setResults(() => allStorage());
          showModal();
        }}
        disabled={isDisabled}
      >
        Submit
      </Button>
    </div>
  );
}
function Results() {
  function allStorage() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    return values;
  }
  useEffect(() => {}, []);
  const columns = [
    {
      title: "Question",
      dataIndex: "question_text",
      key: "question_text",
    },
    {
      title: "Your Answer",
      dataIndex: "userSelected",
      key: "userSelected",
    },
    {
      title: "Correct Answer",
      dataIndex: "correctOption",
      key: "correctOption",
    },
  ];
  return <Table dataSource={allStorage()} columns={columns} />;
}
function Question({
  onCountDownFinish,
  onCountDownFinishFunction,
  question,
  isDisabled,
}) {
  const [Radiovalue, setRadioValue] = useState(0);
  if (onCountDownFinish) {
    onCountDownFinishFunction({
      question_text: question.question_text,
      userSelected: question.option[Radiovalue].text,
      correctOption: question.option.filter((q) => q.isCorrect)[0].text,
      q_id: question.question_id,
    });
  }
  return (
    <>
      <Title level={4}>{question.question_text}</Title>

      <Radio.Group
        onChange={(e) => setRadioValue(e.target.value)}
        value={Radiovalue}
        disabled={isDisabled}
      >
        <Space direction="vertical">
          <Radio value={0}>{question.option[0].text}</Radio>
          <Radio value={1}>{question.option[1].text}</Radio>
          <Radio value={2}>{question.option[2].text}</Radio>
          <Radio value={3}>{question.option[3].text}</Radio>
        </Space>
      </Radio.Group>
    </>
  );
}

export default App;
