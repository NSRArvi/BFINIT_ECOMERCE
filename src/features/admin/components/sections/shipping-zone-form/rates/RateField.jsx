import RateRow from "./RateRow";

export default function RateField({ form, fields, remove }) {
  return (
    <div className="col-span-2 space-y-5">
      {fields.map((field, index) => (
        <RateRow
          key={field.id}
          form={form}
          fields={fields}
          remove={remove}
          index={index}
        />
      ))}
    </div>
  );
}
