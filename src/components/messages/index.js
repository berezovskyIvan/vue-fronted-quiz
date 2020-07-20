export const createQuiz = 'Тест успешно добавлен'
export const duplicateQuiz = function (docNumber) {
  return `Документ под номером "${docNumber}" был опубликован ранее`
}
export const updateQuiz = 'Тест успешно обновлён'
export const changeStatusPublishQuiz = 'Статус публикации теста успешно изменён'
export const changeStatusPublishQuizDuplicate = function (key) {
  return `Ключ "${key}" уже используется`
}
export const deleteQuiz = 'Тест удалён'
