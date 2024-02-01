import { SidebarCreateItem } from "@/components/sidebar/items/all/sidebar-create-item"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChatbotUIContext } from "@/context/context"
import { COLLECTION_DESCRIPTION_MAX, COLLECTION_NAME_MAX } from "@/db/limits"
import { TablesInsert } from "@/supabase/types"
import { CollectionFile } from "@/types"
import { CollectionPrompt } from "@/types/collection-prompt"
import { FC, useContext, useState } from "react"
import { CollectionFilePicker } from "./collection-file-picker"
import { CollectionPromptPicker } from "./collection-prompt-picker"

interface CreateCollectionProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const CreateCollection: FC<CreateCollectionProps> = ({
  isOpen,
  onOpenChange
}) => {
  const { profile, selectedWorkspace } = useContext(ChatbotUIContext)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCollectionFiles, setSelectedCollectionFiles] = useState<
    CollectionFile[]
  >([])
  const [selectedCollectionPrompts, setSelectedCollectionPrompts] = useState<
    CollectionPrompt[]
  >([])

  const handleFileSelect = (file: CollectionFile) => {
    setSelectedCollectionFiles(prevState => {
      const isFileAlreadySelected = prevState.find(
        selectedFile => selectedFile.id === file.id
      )
      if (isFileAlreadySelected) {
        return prevState.filter(selectedFile => selectedFile.id !== file.id)
      } else {
        return [...prevState, file]
      }
    })
  }
  const handlePromptSelect = (prompt: CollectionPrompt) => {
    setSelectedCollectionPrompts(prevState => {
      const isPromptAlreadySelected = prevState.find(
        selectedPrompt => selectedPrompt.id === prompt.id
      )
      if (isPromptAlreadySelected) {
        return prevState.filter(
          selectedPrompt => selectedPrompt.id !== prompt.id
        )
      } else {
        return [...prevState, prompt]
      }
    })
  }

  if (!profile) return null
  if (!selectedWorkspace) return null

  return (
    <SidebarCreateItem
      contentType="collections"
      // createState={
      //   {
      //     collectionFiles: selectedCollectionFiles.map(file => ({
      //       user_id: profile.user_id,
      //       collection_id: "",
      //       file_id: file.id
      //     })),
      //     user_id: profile.user_id,
      //     name,
      //     description
      //   } as TablesInsert<"collections">
      // }
      createState={
        {
          collectionPrompts: selectedCollectionPrompts.map(prompt => ({
            user_id: profile.user_id,
            collection_id: "",
            file_id: prompt.id
          })),
          user_id: profile.user_id,
          name,
          description
        } as TablesInsert<"collections">
      }
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      renderInputs={() => (
        <>
          <div className="space-y-1">
            <Label>Name</Label>

            <Input
              placeholder="Collection name..."
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={COLLECTION_NAME_MAX}
            />
          </div>

          <div className="space-y-1">
            <Label>Description</Label>

            <Input
              placeholder="Collection description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={COLLECTION_DESCRIPTION_MAX}
            />
          </div>

          <div className="space-y-1">
            <Label>Prompts</Label>

            <CollectionPromptPicker
              selectedCollectionPrompts={selectedCollectionPrompts}
              onCollectionPromptSelect={handlePromptSelect}
            />
          </div>

          {/* <div className="space-y-1">
            <Label>Files</Label>

            <CollectionPromptPicker
              selectedCollectionFiles={selectedCollectionFiles}
              onCollectionFileSelect={handleFileSelect}
            />
          </div> */}
        </>
      )}
    />
  )
}
