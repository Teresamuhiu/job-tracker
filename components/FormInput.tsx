export default function FormInput({
    label,
    name,
    value,
    type = 'text',
    onChange,
  }: {
    label: string;
    name: string;
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  }) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">{label}</label>
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 border rounded"
            rows={4}
          ></textarea>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 border rounded"
          />
        )}
      </div>
    );
  }
  