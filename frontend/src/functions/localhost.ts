import type { CharClass } from "../types";
const DEFAULT_CLASS = 'wizard' as CharClass

const PREPARED_SPELLS_LS_NAME = 'preparedSpellIds'

/**
 * Возвращает сохраненные в LocalStorage id в виде Set
 */
export function getIdsFromLocalStorage(): Set<string> {
    const savedIds = JSON.parse(localStorage.getItem(PREPARED_SPELLS_LS_NAME) || '[]');
    return new Set(savedIds)
}


/**
 * Добавляет id в хранящиеся в LocalStorage если его там еще нет
 * @param spellId - id Заклинания
 */
export function addIdToLocalStorage(spellId: string) {
    const savedIdsInLocalStorage = getIdsFromLocalStorage()
    savedIdsInLocalStorage.add(spellId)
    localStorage.setItem(PREPARED_SPELLS_LS_NAME, JSON.stringify([...savedIdsInLocalStorage]))
}

/**
 * Удаляет id из хранящихся в LocalStorage
 * @param spellId - id Заклинания
 */
export function removeIdFromLocalStorage(spellId: string) {
    const savedIdsInLocalStorage = getIdsFromLocalStorage()
    savedIdsInLocalStorage.delete(spellId)
    localStorage.setItem(PREPARED_SPELLS_LS_NAME, JSON.stringify([...savedIdsInLocalStorage]))
}

/**
 * Очищает все id сохраненные в LocalStorage
 */
export function clearIdsInLocalStorage() {
    localStorage.setItem(PREPARED_SPELLS_LS_NAME, JSON.stringify([]))
}

/**
 * Получить последний выбранный класс из LocalStorage
 */
export function getClassFromLocalStorage(): CharClass {
    // TODO: Починить этот невнятный костыль
    const savedClass: CharClass = localStorage.getItem('lastSelectedClass') as CharClass
    return savedClass || DEFAULT_CLASS;
}

/**
 * Сохранить последний выбранный класс из LocalStorage
 */
export function setClassToLocalStorage(className: string) {
    return localStorage.setItem('lastSelectedClass', className)
}
