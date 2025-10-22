import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Card, CardBody } from "@material-tailwind/react";
import { adminProfile, dietChartsList } from '@/hooks/ReactQueryHooks';
import { Clock, Coffee, Sun, Utensils, Moon, Milk, Trash, SquarePen } from "lucide-react";
import MealSection from './MealSection';
import ModalDeleteChart from './ModalDeleteChart';
import ModalEditChart from './ModalEditChart';

export default function DietChartList() {
  const [language, setLanguage] = useState("en")
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedDietData, setSelectedDietData] = useState(null);

  const handleShowingInfoDelete = (diet) => {
    setSelectedDietData(diet);
    setShowModalDelete(true);
  };
  const handleShowingInfoEdit = (diet) => {
    setSelectedDietData(diet);
    setShowModalEdit(true);
  };

  const { data: profile } = useQuery({
    queryKey: ['profile',],
    queryFn: adminProfile
  });

  const { data: dietChart, isLoading } = useQuery({
    queryKey: ['dietChart', profile?.role],
    queryFn: () => dietChartsList(profile?.role)
  });

  return (
    <>
      <Card className="mt-8 px-4">
        <CardBody className="overflow-x-auto p-0">
          <div className="min-h-screen p-4">
            <div className=" mx-auto space-y-6">
              {/* Header */}
              <div className="space-y-4 flex justify-between">
                <div>

                  <h1 className="text-4xl font-bold text-gray-900">{language === "bn" ? "ডায়েট চার্ট" : "Diet Charts"}</h1>
                  <p className="text-lg text-gray-600 max-w-2xl ">
                    {language === "bn"
                      ? "আপনার স্বাস্থ্যকর জীবনযাত্রার জন্য বিশেষভাবে তৈরি খাদ্য তালিকা"
                      : "Specially curated meal plans for your healthy lifestyle"}
                  </p>
                </div>
                {/* Language Tabs */}
                <div className="">
                  <div className="inline-flex rounded-md shadow-sm border border-gray-300">
                    <button
                      className={`px-10 py-2 text-sm font-medium ${language === "en"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      onClick={() => setLanguage("en")}
                    >
                      En
                    </button>
                    <button
                      className={`px-10 py-2 text-sm font-medium ${language === "bn"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      onClick={() => setLanguage("bn")}
                    >
                      {/* বাংলা */}
                      Bn
                    </button>
                  </div>
                </div>



              </div>

              {/* Diet Plan Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4">
                {dietChart?.map((diet) => (
                  <div key={diet.id} className="rounded-lg overflow-hidden border bg-white shadow hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-gradient-to-r from-primary to-[#6b211d] p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>

                          <span className="inline-flex items-center gap-1 bg-white/20 text-sm text-white px-2 py-1 rounded-md border border-white/30 mt-1">
                            <Clock className="h-3 w-3" />
                            {language === "bn" ? diet.calorybn : `${diet.caloryen}`} {language === "bn" ? "ক্যালোরি" : "cal"}
                          </span>
                        </div>

                        <div className='flex gap-2'>
                          <span className="inline-flex items-center gap-1 bg-white/20 text-sm text-white px-2 py-1 rounded-md border border-white/30 mt-1">
                            <SquarePen className="h-5 w-5" onClick={() => handleShowingInfoEdit(diet)} />
                          </span>
                          <span className="inline-flex items-center gap-1 bg-white/20 text-sm text-white px-2 py-1 rounded-md border border-white/30 mt-1">
                            <Trash className="h-5 w-5" onClick={() => handleShowingInfoDelete(diet)} />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <MealSection
                        icon={Coffee}
                        title={language === "bn" ? "সকালের নাস্তা" : "Breakfast"}
                        contentBn={diet.breakfastbn}
                        contentEn={diet.breakfasten}
                        language={language}
                      />

                      {(diet.morn_snacksbn || diet.morn_snacksen) && (
                        <>
                          <hr className="border-gray-200" />
                          <MealSection
                            icon={Sun}
                            title={language === "bn" ? "সকালের নাস্তা" : "Morning Snacks"}
                            contentBn={diet.morn_snacksbn}
                            contentEn={diet.morn_snacksen}
                            language={language}
                          />
                        </>
                      )}

                      <hr className="border-gray-200" />
                      <MealSection
                        icon={Utensils}
                        title={language === "bn" ? "দুপুরের খাবার" : "Lunch"}
                        contentBn={diet.lunchbn}
                        contentEn={diet.lunchen}
                        language={language}
                      />

                      {(diet.anoon_snacksbn || diet.anoon_snacksen) && (
                        <>
                          <hr className="border-gray-200" />
                          <MealSection
                            icon={Sun}
                            title={language === "bn" ? "বিকেলের নাস্তা" : "Afternoon Snacks"}
                            contentBn={diet.anoon_snacksbn}
                            contentEn={diet.anoon_snacksen}
                            language={language}
                          />
                        </>
                      )}

                      <hr className="border-gray-200" />
                      <MealSection
                        icon={Moon}
                        title={language === "bn" ? "রাতের খাবার" : "Dinner"}
                        contentBn={diet.dinnerbn}
                        contentEn={diet.dinneren}
                        language={language}
                      />

                      {(diet.sleep_milkbn || diet.sleep_milken) && (
                        <>
                          <hr className="border-gray-200" />
                          <MealSection
                            icon={Milk}
                            title={language === "bn" ? "ঘুমানোর আগে" : "Before Bed"}
                            contentBn={diet.sleep_milkbn}
                            contentEn={diet.sleep_milken}
                            language={language}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Footer */}
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">
                  {language === "bn" ? "স্বাস্থ্যকর খাবার খান, সুস্থ থাকুন" : "Eat healthy, stay healthy"}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <ModalDeleteChart showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} selectedDietData={selectedDietData}></ModalDeleteChart>
      <ModalEditChart setShowModalEdit={setShowModalEdit} showModalEdit={showModalEdit} selectedDietData={selectedDietData}></ModalEditChart>
    </>
  )
}
