import { skills } from '../data/skills.js'

export const testSkill = skills.find((skill) => skill.id === 'skill-001')

export const validInput = {
  skillIds: ['skill-001'],
  title: 'Аналіз продажів у SQL',
  summary: 'Склала запити з групуванням і об’єднанням таблиць.',
  hoursSpent: 6,
  readyToPublish: false,
  link: '',
}

export const savedCase = {
  ...validInput,
  id: 'case-test-001',
}