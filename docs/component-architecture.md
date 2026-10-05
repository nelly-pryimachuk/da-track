# Архітектура компонентів

## Ієрархія
App
AppLayout
SiteHeader
MainNav
main
HomePage
Section (про мене)
Section (навички)
SkillsSummary
SkillList
SkillCard (для кожного запису)
StatusBadge
EmptyState (якщо список порожній)
CasePage
Section (додавання кейсу)
StatusBadge
CaseFormPreview
FormField (для кожного поля)
AppButton (кнопки)
footer

## Контракти ключових компонентів

| Компонент | Вхідні властивості | Домовленість |
|---|---|---|
| AppLayout | title, links, children | Створює спільну оболонку з одним main |
| Section | id, title, children | id унікальний у поточному документі |
| SkillList | items | Масив навичок; порожній масив допустимий |
| SkillCard | item | Коректний запис із полями моделі Л1.1 |
| StatusBadge | status | Текстовий статус, без зміни даних |
| CasePage | skill | Запис або відсутнє значення для порожнього результату |
| FormField | id, label, hint, children | Вкладене поле має відповідний id і зв'язок із підказкою |
| CaseFormPreview | idPrefix, skillName | Унікальний префікс; макет без збереження |
| AppButton | children, type, variant, disabled | variant: primary або secondary |

## Обґрунтування рішень

**Чому StatusBadge замість AvailabilityBadge:** навичка має не бінарний стан (доступне/недоступне), а один із трьох текстових статусів прогресу навчання, тому компонент приймає рядок, а не логічне значення.

**Чому власні стилі, а не React Bootstrap:** наявний набір UI-компонентів (AppButton, FormField) уже має чіткий контракт і покриває поточні потреби; додавання бібліотеки зараз не усуває дублювання і не спрощує код.

**Повторне використання:** Section використано двічі з різним вмістом (композиція); StatusBadge використано в SkillCard і в CasePage без копіювання правила подання статусу.