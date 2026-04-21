import { allSkills, generatedAt } from "../../../lib/skills"
export async function GET() {
  return Response.json({ generated_at: generatedAt(), count: allSkills().length, records: allSkills() })
}
