const MealSection = ({ icon: Icon, title, contentBn, contentEn, language }) => {
  const content = language === "bn" ? contentBn : contentEn
  if (!content) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primaryBg" />
        <h4 className="font-medium text-sm">{title}</h4>
      </div>
      <div className="pl-6">
        <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{content}</p>
      </div>
    </div>
  )
}

export default MealSection;