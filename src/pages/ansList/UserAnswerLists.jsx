import React, { useState } from 'react';

import {
  Mail,
  Phone,
  CheckCircle,
  FileText,
  Globe,
  Calendar,
} from "lucide-react"
import { useParams, useLocation } from "react-router-dom";

export default function UserAnswerLists() {
  const [language, setLanguage] = useState("en")
  const [selectedCategory, setSelectedCategory] = useState(null)
const { qansjson_id } = useParams(); 

  const location = useLocation(); 
  const surveyData = location.state?.surveyData;
  const answersMap = {};
  if (Array.isArray(surveyData?.qans_indi)) {
    surveyData.qans_indi.forEach((answer) => {
      if (answer?.qid != null) {
        answersMap[answer.qid] = answer.qans;
      }
    });
  }

  const parseAnswer = (answerString) => {
    try {
      const parsed = JSON.parse(answerString)
      return Array.isArray(parsed) ? parsed : [answerString]
    } catch {
      return [answerString]
    }
  }

  const groupedQuestions = Array.isArray(surveyData?.quesList)
    ? surveyData.quesList.reduce((acc, question) => {
      const categoryKey = language === "en"
        ? question?.category
        : question?.category_bangla;

      if (categoryKey) { 
        if (!acc[categoryKey]) {
          acc[categoryKey] = [];
        }
        acc[categoryKey].push(question);
      }
      return acc;
    }, {})
    : {}; 

  const filteredCategories = selectedCategory
    ? { [selectedCategory]: groupedQuestions[selectedCategory] }
    : groupedQuestions

  const totalQuestions = surveyData?.quesList?.length
  const answeredQuestions = surveyData?.qans_indi?.length
  const completionRate = Math.round((answeredQuestions / totalQuestions) * 100)

  const categoryColors = {
    Knowledge: "bg-blue-100 text-blue-800 border-blue-200",
    জ্ঞান: "bg-blue-100 text-blue-800 border-blue-200",
    "Attitude and Perception": "bg-green-100 text-green-800 border-green-200",
    "মনোভাব ও ধারনা": "bg-green-100 text-green-800 border-green-200",
    "Motivators to lose weight": "bg-purple-100 text-purple-800 border-purple-200",
    "ওজন কমানোর অনুপ্রেরনা": "bg-purple-100 text-purple-800 border-purple-200",
    "Barriers to weight loss": "bg-red-100 text-red-800 border-red-200",
    "ওজন কমানোর বাধা সমূহ": "bg-red-100 text-red-800 border-red-200",
    Diet: "bg-orange-100 text-orange-800 border-orange-200",
    "খাদ্য/ খাদ্যভ্যাস": "bg-orange-100 text-orange-800 border-orange-200",
    Exercise: "bg-teal-100 text-teal-800 border-teal-200",
    "শরীর চর্চা/ব্যয়াম": "bg-teal-100 text-teal-800 border-teal-200",
    "Screen time and sleep": "bg-indigo-100 text-indigo-800 border-indigo-200",
    "স্ক্রিন টাইম এবং ঘুম": "bg-indigo-100 text-indigo-800 border-indigo-200",
  }

  return (
    <div >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === "en" ? "Survey Results" : "সমীক্ষার ফলাফল"}
            </h1>
            <p className="text-gray-600">
              {language === "en"
                ? "Health & Obesity Questionnaire Response Review"
                : "স্বাস্থ্য ও স্থূলতা প্রশ্নাবলীর উত্তর পর্যালোচনা"}
            </p>
          </div>
          <div className="flex justify-center mb-6 gap-2">
            <button
              onClick={() => setLanguage("en")}
              className={`flex items-center px-8 py-2 rounded-md text-sm font-medium border font-[poppins] ${language === "en" ? "bg-[#7B1E19] text-white" : "bg-white text-gray-700 border-gray-300"}`}
            >
              <Globe className="w-4 h-4 mr-2" />
              English
            </button>
            <button
              onClick={() => setLanguage("bn")}
              className={`flex items-center px-8 py-2 rounded-md text-sm font-medium border font-[poppins] ${language === "bn" ? "bg-[#7B1E19] text-white" : "bg-white text-gray-700 border-gray-300"}`}
            >
              <Globe className="w-4 h-4 mr-2" />
              বাংলা
            </button>
          </div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
                {surveyData?.user?.fulname.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{surveyData?.user?.fulname}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {surveyData?.user?.smsmobile}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {surveyData?.user?.logemail}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
                <div className="text-sm text-gray-500">{language === "en" ? "Total Questions" : "মোট প্রশ্ন"}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{answeredQuestions}</div>
                <div className="text-sm text-gray-500">{language === "en" ? "Answered" : "উত্তরদান"}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
                <div className="text-sm text-gray-500">{language === "en" ? "Completion Rate" : "সম্পূর্ণতার হার"}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold">{language === "en" ? "Categories" : "বিভাগসমূহ"}</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {language === "en"
                ? "Filter by category or view all responses"
                : "বিভাগ অনুযায়ী ফিল্টার করুন বা সব উত্তর দেখুন"}
            </p>

            <div className="flex flex-wrap gap-2">
              <span className={`cursor-pointer text-sm px-3 py-1.5 rounded-full border ${selectedCategory === null ? "bg-blue-600 text-white" : "bg-white text-gray-700 border-gray-300"}`}
                onClick={() => setSelectedCategory(null)}

              >
                {language === "en" ? "All Categories" : "সব বিভাগ"}
              </span>
              {groupedQuestions && Object.keys(groupedQuestions).map((category) => (
                <span className={`cursor-pointer text-sm px-3 py-1.5 rounded-full border ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-white text-gray-700 border-gray-300"} ${categoryColors[category] || ""}`}
                  key={category}
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}

                >
                  {category} ({groupedQuestions[category].length})
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {filteredCategories &&
              Object.entries(filteredCategories).map(([category, questions]) => (
                <div key={category} className="bg-white rounded-lg shadow">
                  <div className={`px-6 py-4 border-b font-semibold text-lg ${categoryColors[category] || "bg-blue-100 text-blue-800"}`}>

                    <div className="flex justify-between items-center">
                      <span>{category}</span>
                      <span className="text-sm bg-white/50 px-2 py-1 rounded">
                        {questions?.length} {language === "en" ? "questions" : "প্রশ্ন"}
                      </span>
                    </div>
                  </div>
                  <div className="divide-y">
                    {questions.map((question, index) => {
                      const answer = answersMap[question.qid]
                      const parsedAnswers = answer ? parseAnswer(answer) : []
                      const hasAnswer = answer && answer.trim() !== ""

                      return (
                        <div key={question.qid} className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1 space-y-3">
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {language === "en" ? question.qeng : question.qbang}
                                </h3>
                                <div className="flex gap-2 mt-2 text-xs">
                                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">ID: {question.qid}</span>
                                  {hasAnswer && (
                                    <span className="flex items-center bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      {language === "en" ? "Answered" : "উত্তরদান"}
                                    </span>
                                  )}
                                </div>
                              </div>


                              <div className="bg-gray-50 rounded-lg p-4">
                                {hasAnswer ? (
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                                      {language === "en" ? "Response:" : "উত্তর:"}
                                    </h4>
                                    {parsedAnswers.length > 1 ? (
                                      <ul className="space-y-1 text-sm">
                                        {parsedAnswers.map((ans, idx) => (
                                          <li key={idx} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                            {ans}
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-sm text-gray-800">{parsedAnswers[0]}</p>
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 italic">
                                    {language === "en" ? "No response provided" : "কোন উত্তর প্রদান করা হয়নি"}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
          </div>
          <div className="bg-white rounded-lg shadow mt-8 p-6 text-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 inline mr-2" />
            {language === "en"
              ? `Survey completed with ${answeredQuestions} out of ${totalQuestions} questions answered (${completionRate}% completion rate)`
              : `${totalQuestions} টি প্রশ্নের মধ্যে ${answeredQuestions} টি প্রশ্নের উত্তর দেওয়া হয়েছে (${completionRate}% সম্পূর্ণতার হার)`}
          </div>
        </div>
      </div>
    </div>





  )
}
