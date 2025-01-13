import { useState } from "react";
import MyDialog from "../MyDialog";
import { Box, Button, Fieldset, Input } from "@chakra-ui/react";
import { Field } from "../../ui/field";
import MyDatePicker from "../MyDatePicker/MyDatePicker";
import { useTaskContext, generateTaskHash, TaskItem } from "../../context/TaskContext";

interface Props {
  closeDialog: () => void;
  isOpen: boolean;
}

export function AddTask(props: Props) {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const { addTask } = useTaskContext();

  const handleSubmit = () => {
    if (!taskName || !dueDate) {
      return;
    }

    const date_unix = dueDate.getTime();

    // TaskItem 型のオブジェクトを作成
    const newTask: TaskItem = {
      task: taskName,
      date_unix,
      task_hush: generateTaskHash({ task: taskName, date_unix }), // ハッシュを生成
    };

    addTask([newTask]); // 配列形式で渡す
    setTaskName(""); // フォームをリセット
    setDueDate(null);
    props.closeDialog();
  };

  const handleCancel = () => {
    setTaskName("");
    setDueDate(null);
    props.closeDialog();
  };

  return (
    <MyDialog.Root
      open={props.isOpen}
      closeOnInteractOutside={false}
      onOpenChange={props.closeDialog}
    >
      <MyDialog.Content bg="orange.50">
        <MyDialog.Header>タスクを追加</MyDialog.Header>

        <MyDialog.Body>
          <Box w="400px" maxW="100%">
            <Fieldset.Root size="md">
              <Fieldset.Content>
                {/* タスク名入力 */}
                <Field label="タスク名">
                  <Input
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="タスク名を入力"
                    size="lg"
                    bg="white"
                    borderColor="orange.200"
                    _hover={{ borderColor: "orange.300" }}
                  />
                </Field>
                {/* 期限入力 */}
                <Field label="期限">
                  <MyDatePicker
                    selected={dueDate}
                    onChange={(date: Date | null) => setDueDate(date)}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="期限を選択"
                  />
                </Field>
              </Fieldset.Content>
            </Fieldset.Root>
          </Box>
        </MyDialog.Body>

        <MyDialog.Footer display="flex" justifyContent="space-between">
          <Button
            colorScheme="orange"
            onClick={handleSubmit}
            disabled={!taskName || !dueDate}
            size="lg"
          >
            登録
          </Button>
          <Button
            variant="outline"
            colorScheme="orange"
            onClick={handleCancel}
            size="lg"
          >
            キャンセル
          </Button>
        </MyDialog.Footer>
      </MyDialog.Content>
    </MyDialog.Root>
  );
}
