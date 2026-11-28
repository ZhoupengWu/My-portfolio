/**
 * Skills shown on /skills, grouped by area.
 *
 * Each skill is linked automatically to the projects and education repos whose
 * `technologies` list contains its name (case-insensitive). A skill that only
 * appears in education repos is shown as "Learning". Technologies used in
 * content but missing here end up in an "Other" group, so nothing is lost.
 */
export interface Skill {
  name: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [{ name: 'C++' }, { name: 'Python' }, { name: 'JavaScript' }, { name: 'Rust' }, { name: 'Go' }],
  },
  {
    title: 'Web',
    skills: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'Canvas' }, { name: 'Flask' }, { name: 'Gin' }],
  },
  {
    title: 'Data & tooling',
    skills: [
      { name: 'SQLAlchemy' },
      { name: 'GORM' },
      { name: 'SQLite' },
      { name: 'PostgreSQL' },
      { name: 'Docker' },
      { name: 'Cargo' },
      { name: 'SFML' },
      { name: 'winbgim.h' },
    ],
  },
];
