interface StateArrayProps {
  matrix: number[][];
}

export default function StateArray({ matrix }: StateArrayProps) {
  return (
    <table>
      {matrix.map((row, i) => (
        <tr key={i}>
          {row.map((val, j) => (
            <td key={i * matrix.length + j}>{val}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}
