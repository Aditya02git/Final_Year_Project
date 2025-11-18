import { Edit, Trash2 } from "lucide-react";

export const CounselorTable = ({ counselors, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Institution</th>
            <th>Specialties</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {counselors.map((counselor) => (
            <tr key={counselor._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img src={counselor.profilePic} alt={counselor.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{counselor.name}</div>
                    <div className="text-sm opacity-70">
                      {counselor.languages.join(", ")}
                    </div>
                  </div>
                </div>
              </td>
              <td>{counselor.email}</td>
              <td className="text-sm">{counselor.institution}</td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {counselor.specialties.slice(0, 2).map((specialty) => (
                    <div key={specialty} className="badge badge-sm badge-outline">
                      {specialty}
                    </div>
                  ))}
                  {counselor.specialties.length > 2 && (
                    <div className="badge badge-sm">
                      +{counselor.specialties.length - 2}
                    </div>
                  )}
                </div>
              </td>
              <td>{counselor.experience} years</td>
              <td>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(counselor)}
                    className="btn btn-ghost btn-sm"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(counselor._id)}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};