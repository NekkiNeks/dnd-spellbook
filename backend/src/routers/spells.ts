import { Router } from "express";
import { handleError } from "../utils/errorHandler";
import responseWrapper from "../utils/responseWrapper";
import { getAllSpells } from "../resources/spells";
import { multiLevelSort } from "../utils/sorting";

const router = Router()

// Получение списка эпизодов подкаста
router.get('/:classname', async (req, res) => {
    try {
        const classname = req.params.classname
        const spells = await getAllSpells(classname)

        const sortedSpells = multiLevelSort(spells as any[], [])

        return responseWrapper(res, true, sortedSpells)
    } catch (err: unknown) {
        handleError(res, err)
    }
})

export default router
