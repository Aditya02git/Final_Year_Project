export const CounselorCard = ({ counselor, isSelected, onSelect }) => {
  return (
    <div
      className={`card border-2 cursor-pointer transition-all hover:shadow-lg ${
        isSelected
          ? "border-info bg-info/10"
          : "border-info/30 hover:border-info"
      }`}
      onClick={() => onSelect(counselor._id)}
    >
      <div className="card-body p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
              <img src={counselor.profilePic} alt={counselor.name} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{counselor.name}</h3>
            <p className="text-xs opacity-70">{counselor.institution}</p>
            <div className="badge badge-info badge-sm mt-1">₹{counselor.sessionFee || 999}</div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium opacity-70 mb-1">Specialties:</p>
            <div className="flex flex-wrap gap-1">
              {counselor.specialties.slice(0, 2).map((specialty) => (
                <div key={specialty} className="badge badge-outline badge-sm">
                  {specialty}
                </div>
              ))}
              {counselor.specialties.length > 2 && (
                <div className="badge badge-outline badge-sm">
                  +{counselor.specialties.length - 2}
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium opacity-70 mb-1">Languages:</p>
            <div className="flex flex-wrap gap-1">
              {counselor.languages.map((language) => (
                <div key={language} className="badge badge-outline badge-sm">
                  {language}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};