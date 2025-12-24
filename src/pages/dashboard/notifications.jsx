import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Progress,
  Radio,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react"
import { ChevronLeft, ChevronRight, Send, CheckCircle } from "lucide-react"
const questionsData = [
  {
    id: 1,
    type: "multiple-choice",
    question: "How satisfied are you with our service?",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
  },
  {
    id: 2,
    type: "text",
    question: "What improvements would you suggest for our product?",
  },
  {
    id: 3,
    type: "checkbox",
    question: "Which features do you use regularly?",
    options: ["Feature A", "Feature B", "Feature C", "Feature D", "Feature E"],
  },
  {
    id: 4,
    type: "textarea",
    question: "Please provide any additional feedback you may have.",
  },
]

export function Notifications() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleNext = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [questionsData[currentQuestion].id]: value,
    })
  }

  const handleCheckboxChange = (option) => {
    const currentAnswers = answers[questionsData[currentQuestion].id] || []
    let newAnswers

    if (currentAnswers.includes(option)) {
      newAnswers = currentAnswers.filter((item) => item !== option)
    } else {
      newAnswers = [...currentAnswers, option]
    }

    setAnswers({
      ...answers,
      [questionsData[currentQuestion].id]: newAnswers,
    })
  }

  const progressPercentage = ((currentQuestion + 1) / questionsData.length) * 100

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <Card className="w-full max-w-xl shadow-lg">
          <CardBody className="flex flex-col items-center p-8 text-center">
            <div className="rounded-full bg-green-100 p-6 mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <Typography variant="h4" className="mb-2">
              Thank You!
            </Typography>
            <Typography className="text-gray-600 mb-6">
              Your responses have been submitted successfully. We appreciate your feedback!
            </Typography>
            <Button
              onClick={() => {
                setSubmitted(false)
                setCurrentQuestion(0)
                setAnswers({})
              }}
              className="mt-4"
            >
              Submit Another Response
            </Button>
          </CardBody>
        </Card>
      </div>
    )
  }

  const currentQuestionData = questionsData[currentQuestion]

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <Card className="w-full max-w-xl shadow-lg">
          <CardHeader className="p-4 ">
            <div className="w-full mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2 ">
                <span>
                  Question {currentQuestion + 1} of {questionsData.length}
                </span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            <Typography variant="h5" className="font-bold">
              {currentQuestionData.question}
            </Typography>
          </CardHeader>

          <CardBody className="py-6">
            {currentQuestionData.type === "multiple-choice" && (
              <div className="space-y-3">
                {currentQuestionData.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Radio
                      id={`option-${index}`}
                      name="multiple-choice"
                      checked={answers[currentQuestionData.id] === option}
                      onChange={() => handleAnswerChange(option)}
                    />
                    <label htmlFor={`option-${index}`} className="text-sm font-medium">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {currentQuestionData.type === "text" && (
              <Input
                placeholder="Type your answer here"
                value={answers[currentQuestionData.id] || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="mt-2"
              />
            )}

            {currentQuestionData.type === "textarea" && (
              <Textarea
                placeholder="Type your detailed feedback here"
                value={answers[currentQuestionData.id] || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="mt-2 min-h-[120px]"
              />
            )}

            {currentQuestionData.type === "checkbox" && (
              <div className="space-y-3">
                {currentQuestionData.options?.map((option, index) => {
                  const currentAnswers = answers[currentQuestionData.id] || []
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`checkbox-${index}`}
                        checked={currentAnswers.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                      />
                      <label htmlFor={`checkbox-${index}`} className="text-sm font-medium">
                        {option}
                      </label>
                    </div>
                  )
                })}
              </div>
            )}
          </CardBody>

          <CardFooter className="flex justify-between pt-2">
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>

            {currentQuestion < questionsData.length - 1 ? (
              <Button onClick={handleNext} className="flex items-center gap-1">
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="flex items-center gap-1 bg-green-600 hover:bg-green-700">
                Submit <Send className="h-4 w-4 ml-1" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Notifications;
