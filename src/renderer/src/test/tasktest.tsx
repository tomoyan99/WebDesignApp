import { useState } from 'react';
import {Box, Button, Fieldset, Input} from '@chakra-ui/react';
import {Field} from "../ui/field";
import MyDatePicker from "../components/MyDatePicker/MyDatePicker";

export const TaskCreate = () => {
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState<Date|null>(null);
    // const { isOpen, onOpen, onClose } = useDisclosure();

    const handleTaskNameChange = (e) => setTaskName(e.target.value);
    const handleDueDateChange = (date) => setDueDate(date);

    const handleSubmit = () => {
        if (taskName && dueDate) {
            const dateUnix = Math.floor(dueDate.getTime() / 1000); // Unix timestamp (seconds)
            const taskData = { date_unix: dateUnix, task: taskName };
            console.log(taskData); // 送信されるデータ
            setTaskName(''); // フォームのリセット
            setDueDate(null);
        }
    };

    const handleCancel = () => {
        setTaskName('');
        setDueDate(null);
    };

    return (
        <Box
            p={6}
            w="400px"
            borderRadius="md"
            boxShadow="lg"
            bg="orange.50"
            maxW="lg"
            margin="auto"
        >
            <Fieldset.Root size="lg" maxW="md">
                <Fieldset.Content>
                    <Field label="タスク名">
                        <Input
                            value={taskName}
                            onChange={handleTaskNameChange}
                            placeholder="タスク名を入力"
                            size="lg"
                            bg="white"
                            borderColor="orange.200"
                            _hover={{ borderColor: 'orange.300' }}
                        />
                    </Field>
                    <Field label={"期限"}>
                        <MyDatePicker
                            selected={dueDate}
                            onChange={handleDueDateChange}
                            dateFormat="yyyy/MM/dd"
                            placeholderText="期限を選択"
                        />
                    </Field>
                </Fieldset.Content>
            </Fieldset.Root>
            <Box display="flex" justifyContent="space-between" w="100%">
                <Button
                    colorScheme="orange"
                    onClick={handleSubmit}
                    disabled={!taskName || !dueDate}
                    size="lg"
                >
                    送信する
                </Button>
                <Button
                    variant="outline"
                    colorScheme="orange"
                    onClick={handleCancel}
                    size="lg"
                >
                    キャンセル
                </Button>
            </Box>
        </Box>
    );
};

export default TaskCreate;
