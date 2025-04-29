import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,

} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useForm ,Controller } from "react-hook-form"
import { PlusCircle, Trash2 } from "lucide-react";
export default function Questionnaire() {
  const [questions, setQuestions] = useState([]);
  // const [questionText, setQuestionText] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()

  const [options, setOptions] = useState([
    { id: "1", text: "" },
    { id: "2", text: "" },
    { id: "3", text: "" },
    { id: "4", text: "" },
  ]);

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, { id: Date.now().toString(), text: "" }]);
    }
  };

  const handleRemoveOption = (id) => {
    if (options.length > 4) {
      setOptions(options.filter((option) => option.id !== id));
    }
  };

  const handleOptionChange = (id, value) => {
    setOptions(options.map((option) => (option.id === id ? { ...option, text: value } : option)));
  };

  const handleAddQuestion = () => {
    if (questionText.trim() === "") {
      alert("Please enter a question");
      return;
    }

    const emptyOptions = options.filter((option) => option.text.trim() === "");
    if (emptyOptions.length > 0) {
      alert("Please fill in all options");
      return;
    }

    const newQuestion = {
      id: Date.now().toString(),
      text: questionText,
      options: [...options],
    };

    setQuestions([...questions, newQuestion]);
    // setQuestionText("");
    setOptions([
      { id: "1", text: "" },
      { id: "2", text: "" },
      { id: "3", text: "" },
      { id: "4", text: "" },
      { id: "5", text: "" },
    ]);
  };


  const onSubmit = (data) => {
    console.log(data);
  }


  return (
    <div className="container mx-auto py-8 px-4">
    <Typography variant="h3" className="mb-8">Question Management System</Typography>

    <Card className="p-4">
      <CardHeader className="p-3">
        <Typography variant="h5">Add New Question</Typography>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
      <CardBody>
        <div className="space-y-6">
          <Input label="Question" {...register("questionText")}/>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Typography variant="h6">Options ( add 4 to 5)</Typography>
              {options.length < 5 && (
                <Button variant="outlined" size="sm" onClick={handleAddOption} className="flex">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  <Typography variant="h6" className="text-sm font-bold"> Add Option</Typography>
                </Button>
              )}
            </div>
        {options.map((option, index) => (
        <div key={option.id} className="flex items-center gap-2">
          <Controller
            name={`options.${index}`} 
            control={control}
            render={({ field }) => (
              <Input
                label={`Option ${index + 1}`}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleOptionChange(option.id, e.target.value);
                }}
              />
            )}
          />
          {options.length > 4 && (
            <Button
              variant="text"
              size="sm"
              onClick={() => handleRemoveOption(option.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
      ))}

          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button fullWidth type="submit" className="bg-primaryBg">Add Question</Button>
      </CardFooter>
      </form>
    </Card>
  </div>
  )
}
